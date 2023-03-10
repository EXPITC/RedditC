import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import CommentInput, { commentInputProps } from './comments/commentInput'
import { User } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import { authModalState } from '@/libs/atoms/authModalAtoms'
import { Post, PostState } from '@/libs/atoms/postsAtom'
import Comment, { comment, commentProps } from './comments/comment'
import { serverTimestamp, Timestamp } from 'firebase/firestore'
import handleComment, {
  deleteComment,
  getComments
} from '@/libs/firebase/handleComment'
import CommentsSkeleton from '../skeleton/commentsSkeleton'
import { useInView } from 'framer-motion'
import useInfoModalProps from '@/libs/hooks/useInfoModalProps'

interface commentsProps {
  user: User | null | undefined
  selectedPost: Post | null
  setPostState: SetterOrUpdater<PostState>
}

const Comments = ({ user, selectedPost, setPostState }: commentsProps) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<{
    total: number
    data: comment[]
  }>({
    total: -1,
    data: []
  })

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  const [loading, setLoading] = useState(false)
  // const [loadingEdit, setLoadingEdit] = useState<string>('')
  const [loadingDelete, setLoadingDelete] = useState<string>('')
  const [loadingFetch, setLoadingFetch] = useState(true)

  const [err, setErr] = useState({
    id: '',
    msg: ''
  })
  const setAuthModal = useSetRecoilState(authModalState)
  const openModalInfoProps = useInfoModalProps()

  const openModalLogin = () => setAuthModal({ open: true, view: 'Login' })

  const onCreateComment = async (comment: string) => {
    if (!selectedPost) return
    if (!user) return openModalLogin()

    setLoading(true)
    try {
      const newComment: comment = {
        id: '',
        creatorId: user.uid,
        creatorUserName: user.displayName || user.email!.split('@')[0],
        creatorPhotoUrl: user.photoURL,
        communityId: selectedPost.communityId.toLowerCase(),
        postId: selectedPost.id,
        postTitle: selectedPost.title,
        text: comment,
        createdAt: serverTimestamp() as Timestamp
      }

      const uploadedComment = await handleComment(newComment)
      if (uploadedComment.err && !uploadedComment.data)
        return setErr({ id: 'Universal', msg: uploadedComment.err })

      setComment('')
      setComments(prev => ({
        ...prev,
        data: [uploadedComment.data!, ...comments.data]
      }))

      setPostState(prev => {
        const postIndex = prev.posts.findIndex(
          i => i.id === uploadedComment.data!.postId
        )
        let posts = [...prev.posts]
        if (postIndex !== -1)
          posts[postIndex] = {
            ...posts[postIndex],
            numberOfComments: posts[postIndex].numberOfComments + 1
          }
        return {
          ...prev,
          selectedPost: {
            ...prev.selectedPost!,
            numberOfComments: prev.selectedPost!.numberOfComments + 1
          },
          posts
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const onDeleteComment = async (cid: string) => {
    try {
      setLoadingDelete(cid)

      const deletedComment = await deleteComment(cid, selectedPost!.id)
      if (deletedComment.err)
        return setErr({ id: cid, msg: deletedComment.err })

      setComments(prev => ({
        ...prev,
        data: prev.data.filter(comment => comment.id != deletedComment.id)
      }))
      setPostState(prev => {
        const postIndex = prev.posts.findIndex(i => i.id === selectedPost!.id)
        let posts = [...prev.posts]
        if (postIndex !== -1)
          posts[postIndex] = {
            ...posts[postIndex],
            numberOfComments: posts[postIndex].numberOfComments - 1
          }
        return {
          ...prev,
          selectedPost: {
            ...prev.selectedPost!,
            numberOfComments: prev.selectedPost!.numberOfComments - 1
          },
          posts
        }
      })
    } finally {
      setLoadingDelete('')
    }
  }

  const getPostComments = async (lastCommentId?: string) => {
    if (!selectedPost) return

    try {
      setLoadingFetch(true)
      if (selectedPost.numberOfComments === 0) return

      const commentsData = await getComments(selectedPost.id, lastCommentId)

      if (commentsData.err)
        return setErr({ id: 'Universal', msg: commentsData.err })
      if (!commentsData.data && commentsData.data === null)
        return setErr({
          id: 'Universal',
          msg: 'Fail to get comments their is missmatch with post'
        })

      setComments(prev => ({
        total: commentsData.data.length,
        data: [...prev.data, ...commentsData.data]
          .reverse()
          .filter(
            (current, index, self) =>
              index === self.findIndex(now => now.id === current.id)
          )
          .reverse()
      }))
    } finally {
      setLoadingFetch(false)
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getPostComments()
  }, [selectedPost?.id])

  useEffect(() => {
    if (loadingFetch) return
    if (comments.total === -1 || comments.total === 0) return
    if (!inView) return
    getPostComments(comments.data[comments.data.length - 1].id)
  }, [inView, loadingFetch, comments])

  const commentInputProps: commentInputProps = {
    comment,
    setComment,
    err,
    user,
    loading,
    onCreateComment
  }
  const commentProps: commentProps = {
    onDeleteComment,
    openModalInfoProps,
    userId: user?.uid || '',
    loadingDelete,
    err
    // loadingEdit
  }

  return (
    <Box bg="white" borderRadius="0 0 4px 4px" py={['5px', '20px']}>
      <Box px={['30px', '40px']}>
        <CommentInput {...commentInputProps} />
      </Box>

      <Stack spacing="6" p="2">
        {comments.data.map(data => (
          <Comment key={data.id} {...commentProps} {...data} />
        ))}
        {loadingFetch && <CommentsSkeleton />}
        <Box ref={ref} id="Hit this and fetch more comments" />

        {selectedPost?.numberOfComments === 0 && (
          <Flex h={['80px', '175px']} justify="center" align="center">
            <Text
              color="gray.400"
              fontWeight="semibold"
              fontSize={['10pt', '14pt']}
            >
              No Comments Yet
            </Text>
          </Flex>
        )}
      </Stack>
    </Box>
  )
}

export default Comments
