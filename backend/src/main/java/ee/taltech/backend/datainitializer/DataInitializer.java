package ee.taltech.backend.datainitializer;

import ee.taltech.backend.person.PersonEntity;
import ee.taltech.backend.person.PersonRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private PersonRepository personRepository;

    @Override
    public void run(String... args) throws Exception {
        if (personRepository.count() == 0) {
            System.out.println("Seeding the database with default data...");


            PersonEntity person1 = new PersonEntity();
            person1.setName("John Doe");
            person1.setEmail("johndoe@example.com");
            person1.setPhoneNumber("123-456-7890");
            person1.setBirthday(LocalDate.of(1980, 1, 1));
            personRepository.save(person1);


            PersonEntity person2 = new PersonEntity();
            person2.setName("Jane Smith");
            person2.setEmail("janesmith@example.com");
            person2.setPhoneNumber("987-654-3210");
            person2.setBirthday(LocalDate.of(1990, 5, 15));
            personRepository.save(person2);

            PersonEntity person3 = new PersonEntity();
            person3.setName("Michael Johnson");
            person3.setEmail("michaelj@example.com");
            person3.setPhoneNumber("555-123-4567");
            person3.setBirthday(LocalDate.of(1985, 8, 22));
            personRepository.save(person3);

            PersonEntity person4 = new PersonEntity();
            person4.setName("Emily Davis");
            person4.setEmail("emilydavis@example.com");
            person4.setPhoneNumber("555-234-5678");
            person4.setBirthday(LocalDate.of(1992, 3, 30));
            personRepository.save(person4);

            PersonEntity person5 = new PersonEntity();
            person5.setName("Christopher Lee");
            person5.setEmail("christopherl@example.com");
            person5.setPhoneNumber("555-345-6789");
            person5.setBirthday(LocalDate.of(1988, 12, 11));
            personRepository.save(person5);

            PersonEntity person6 = new PersonEntity();
            person6.setName("Olivia Brown");
            person6.setEmail("oliviabrown@example.com");
            person6.setPhoneNumber("555-456-7890");
            person6.setBirthday(LocalDate.of(1994, 6, 5));
            personRepository.save(person6);

            PersonEntity person7 = new PersonEntity();
            person7.setName("William Wilson");
            person7.setEmail("williamw@example.com");
            person7.setPhoneNumber("555-567-8901");
            person7.setBirthday(LocalDate.of(1993, 2, 18));
            personRepository.save(person7);

            PersonEntity person8 = new PersonEntity();
            person8.setName("Sophia Moore");
            person8.setEmail("sophiamoore@example.com");
            person8.setPhoneNumber("555-678-9012");
            person8.setBirthday(LocalDate.of(1995, 10, 25));
            personRepository.save(person8);

            PersonEntity person9 = new PersonEntity();
            person9.setName("James Taylor");
            person9.setEmail("jamestaylor@example.com");
            person9.setPhoneNumber("555-789-0123");
            person9.setBirthday(LocalDate.of(1987, 4, 14));
            personRepository.save(person9);

            PersonEntity person10 = new PersonEntity();
            person10.setName("Ava Harris");
            person10.setEmail("avaharris@example.com");
            person10.setPhoneNumber("555-890-1234");
            person10.setBirthday(LocalDate.of(1998, 7, 9));
            personRepository.save(person10);

            System.out.println("Database seeded!");
        } else {
            System.out.println("Database already seeded, skipping...");
        }
    }
}
