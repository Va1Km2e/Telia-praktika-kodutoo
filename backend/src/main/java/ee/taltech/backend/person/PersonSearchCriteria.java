package ee.taltech.backend.person;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record PersonSearchCriteria(
        Long userId,

        String name,

        String email,

        String phoneNumber,

        @PositiveOrZero(message = "Page number must be 0 or greater.")
        Integer page,

        @PositiveOrZero(message = "Page size must be greater than 0.")
        Integer size,

        @Pattern(regexp = "id|name|birthday|email|phoneNumber", message = "Sort by must be one of: id, name, birthday, email, phone number.")
        String sortBy,

        @Pattern(regexp = "ASC|DESC", flags = Pattern.Flag.CASE_INSENSITIVE,
                message = "Sort direction must be either ASC or DESC.")
        String sortDirection
) {}
