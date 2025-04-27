package ee.taltech.backend.person;

import ee.taltech.backend.pageresponse.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/person")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;

    @PostMapping()
    public Long addPerson(@RequestBody PersonDTO personDTO) {
        return personService.addPerson(personDTO);
    }

    @DeleteMapping("/{id}")
    public Long deletePerson(@PathVariable Long id) {
        return personService.deletePerson(id);
    }

    @PutMapping()
    public PersonDTO updatePerson(@RequestBody PersonDTO personDTO) {
        return personService.updatePerson(personDTO);
    }


    @GetMapping("/{id}")
    public PersonDTO getPerson(@PathVariable Long id) {
        return personService.getPerson(id);
    }

    @GetMapping("/search")
    public PageResponse<PersonDTO> getPeople(
            @Valid @ModelAttribute PersonSearchCriteria criteria) {
        return personService.searchPeople(criteria);
    }

}
