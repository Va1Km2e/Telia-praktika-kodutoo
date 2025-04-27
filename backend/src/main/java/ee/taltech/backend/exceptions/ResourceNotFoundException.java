package ee.taltech.backend.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String resourceName, Long resourceId) {
        super(String.format("%s with ID %d not found", resourceName, resourceId));
    }

    public ResourceNotFoundException(String resourceName, String resourceIdentifier) {
        super(String.format("%s with identifier %s not found", resourceName, resourceIdentifier));
    }
}