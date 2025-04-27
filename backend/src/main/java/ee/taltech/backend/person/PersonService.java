package ee.taltech.backend.person;

import ee.taltech.backend.exceptions.ResourceNotFoundException;
import ee.taltech.backend.pageresponse.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository personRepository;
    private final PersonMapper personMapper;

    public Long addPerson(PersonDTO personDTO) {
        PersonEntity personEntity = personMapper.dtoToEntity(personDTO);

        personRepository.save(personEntity);
        return personEntity.getId();
    }

    public Long deletePerson(Long id) {
        if (!personRepository.existsById(id)) {
            throw new ResourceNotFoundException("Person", id);
        }
        personRepository.deleteById(id);
        return id;
    }

    public PersonDTO updatePerson(PersonDTO personDTO) {
        PersonEntity personEntity = personRepository.findById(personDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Person", personDTO.getId()));

        personEntity.setName(personDTO.getName());
        personEntity.setBirthday(personDTO.getBirthday());
        personEntity.setEmail(personDTO.getEmail());
        personEntity.setPhoneNumber(personDTO.getPhoneNumber());

        personRepository.save(personEntity);

        return personDTO;
    }

    public PersonDTO getPerson(Long id) {
        PersonEntity personEntity = personRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Person", id));

        return personMapper.entityToDTO(personEntity);
    }

    public PageResponse<PersonDTO> searchPeople(PersonSearchCriteria criteria) {
        Specification<PersonEntity> spec = Specification.where(null);

        if (criteria.name() != null && !criteria.name().isEmpty()) {
            spec = spec.and(PersonSpecifications.name(criteria.name()));
        }
        if (criteria.email() != null && !criteria.email().isEmpty()) {
            spec = spec.and(PersonSpecifications.email(criteria.email()));
        }
        if (criteria.phoneNumber() != null && !criteria.phoneNumber().isEmpty()) {
            spec = spec.and(PersonSpecifications.phoneNumber(criteria.phoneNumber()));
        }

        int page = criteria.page() != null ? criteria.page() : 0;
        int size = criteria.size() != null ? criteria.size() : 10;
        String sortBy = criteria.sortBy() != null ? criteria.sortBy() : "id";
        String sortDirection = criteria.sortDirection() != null ? criteria.sortDirection() : "ASC";

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(sortDirection), sortBy));

        Page<PersonEntity> personPage = personRepository.findAll(spec, pageable);

        return PageResponse.of(personPage.map(personMapper::entityToDTO));
    }
}