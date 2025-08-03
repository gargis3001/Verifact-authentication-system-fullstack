package in.gargisingh.Verifact.service;

import in.gargisingh.Verifact.io.ProfileRequest;
import in.gargisingh.Verifact.io.ProfileResponse;

public interface ProfileService {
    ProfileResponse createProfile(ProfileRequest request);
    ProfileResponse getProfile(String email);
    void sendResetOtp(String email);
    void resetPassword(String email,String otp,String newPassword);
    void sendOtp(String email);
    void verifyOtp(String email,String otp);

}
