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
