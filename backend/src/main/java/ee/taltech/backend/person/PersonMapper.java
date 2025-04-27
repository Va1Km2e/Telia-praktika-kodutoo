package ee.taltech.backend.person;

import org.springframework.stereotype.Component;

@Component
public class PersonMapper {

    public PersonDTO entityToDTO(PersonEntity personEntity) {
        return PersonDTO.builder()
                .id(personEntity.getId())
                .name(personEntity.getName())
                .birthday(personEntity.getBirthday())
                .email(personEntity.getEmail())
                .phoneNumber(personEntity.getPhoneNumber())
                .build();
    }

    public PersonEntity dtoToEntity(PersonDTO personDTO) {
        return PersonEntity.builder()
                .name(personDTO.getName())
                .birthday(personDTO.getBirthday())
                .email(personDTO.getEmail())
                .phoneNumber(personDTO.getPhoneNumber())
                .build();
    }
}
