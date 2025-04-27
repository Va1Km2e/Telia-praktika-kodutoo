package ee.taltech.backend.person;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class PersonDTO {
    private Long id;
    private String name;
    private LocalDate birthday;
    private String email;
    private String phoneNumber;
}
