import {useAppDispatch, type RootState} from '@main/store'
import {setAvatar} from '@main/store/user'
import React, {memo, useEffect} from 'react'
import {useSelector} from 'react-redux'
import Avatar01JPG from '@main/assets/img/avatar/01.jpg'

const UserAvatar = memo(function UserAvatar() {
  const avatar = useSelector<RootState, string>(state => state.user.avatar)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(setAvatar(Avatar01JPG))
    }, 200)
  }, [])

  return <img alt="" className="avatar" src={avatar}></img>
})

export default UserAvatar
