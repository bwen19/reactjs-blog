import axiosPrivate from './axiosPrivate';
import { User } from './common';

// -------------------------------------------------------------------
// Upload avatar

export interface UploadAvatarResponse {
  user: User;
}

export const uploadAvatar = (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);
  return axiosPrivate.post<UploadAvatarResponse>('/upload/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// -------------------------------------------------------------------
// Upload post image

export interface UploadPostImageResponse {
  image: string;
}

export const uploadPostImage = (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  return axiosPrivate.post<UploadPostImageResponse>('/upload/post-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
