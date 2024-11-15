export interface ProfileData {
  profile: string;
  name: string;
  email: string;
}
export interface LoginProps {
  navigateTo?: string;
}
export interface ApiResponse {
  data: {
    access_token: string;
  };
}
export interface FirebaseUser {
  accessToken?: string;
}
