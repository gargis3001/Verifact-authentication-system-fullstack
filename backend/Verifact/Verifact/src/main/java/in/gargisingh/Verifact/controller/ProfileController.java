package in.gargisingh.Verifact.controller;

import in.gargisingh.Verifact.io.ProfileRequest;
import in.gargisingh.Verifact.io.ProfileResponse;
import in.gargisingh.Verifact.service.EmailService;
import in.gargisingh.Verifact.service.ProfileService;
import jakarta.validation.Valid;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController

@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final EmailService emailService;


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest request){
        ProfileResponse response = profileService.createProfile(request);

        emailService.sendWelcomeEmail(response.getEmail(), response.getName());
        return response;
    }
    @GetMapping("/test")
    public String test(){
        return "Auth is working";
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name") String email){
        return profileService.getProfile(email);


    }
}

//@Valid - validates the bean just before binding the values into the ProfileRequest object