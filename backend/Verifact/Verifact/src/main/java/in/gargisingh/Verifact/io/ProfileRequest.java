package in.gargisingh.Verifact.io;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileRequest {

    @NotBlank(message = "Name should not be empty")
    private String name;
    @Email(message = "Enter a valid email address")
    @NotNull(message = "Email should not be empty")
    private String email;
    @Size(min = 6, message = "Password must be at-least 6 characters")
    private String password;
}
