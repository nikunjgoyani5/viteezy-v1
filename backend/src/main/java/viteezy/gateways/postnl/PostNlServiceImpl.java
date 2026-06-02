package viteezy.gateways.postnl;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.vavr.control.Try;
import jakarta.ws.rs.core.UriBuilder;
import viteezy.configuration.postnl.PostNLConfiguration;
import viteezy.controller.dto.AddressCheckPostRequest;
import viteezy.domain.postnl.Address;
import viteezy.domain.postnl.AddressBodyKey;
import viteezy.domain.postnl.Shipment;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.NoSuchElementException;

public class PostNlServiceImpl implements PostNlService {

    private static final String CUSTOMER_NUMBER = "10825993";
    private static final String ADDRESS_PATH = "/v2/address/benelux";

    private final PostNLConfiguration postNlConfiguration;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    public PostNlServiceImpl(PostNLConfiguration postNlConfiguration, ObjectMapper objectMapper) {
        this.postNlConfiguration = postNlConfiguration;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newHttpClient();
    }

    @Override
    public Try<List<Address>> checkAddress(AddressCheckPostRequest addressCheckPostRequest) {
        return Try.of(() -> {
            String countryIso = convertCountryCode(addressCheckPostRequest.getCountryIso());
            
            UriBuilder uriBuilder = UriBuilder.fromUri(postNlConfiguration.getUrl().concat(ADDRESS_PATH))
                    .queryParam(AddressBodyKey.COUNTRY_ISO, countryIso);
            
            // Add query parameters based on available data
            if (addressCheckPostRequest.getPostalCode() != null && !addressCheckPostRequest.getPostalCode().isEmpty()) {
                uriBuilder.queryParam(AddressBodyKey.POSTAL_CODE, addressCheckPostRequest.getPostalCode());
            }
            
            if (addressCheckPostRequest.getStreet() != null && !addressCheckPostRequest.getStreet().isEmpty()) {
                uriBuilder.queryParam(AddressBodyKey.STREET, addressCheckPostRequest.getStreet());
            }
            
            if (addressCheckPostRequest.getHouseNumber() != null && !addressCheckPostRequest.getHouseNumber().isEmpty()) {
                uriBuilder.queryParam(AddressBodyKey.HOUSE_NUMBER, addressCheckPostRequest.getHouseNumber());
            }
            
            if (addressCheckPostRequest.getHouseNumberAddition() != null && !addressCheckPostRequest.getHouseNumberAddition().isEmpty()) {
                uriBuilder.queryParam(AddressBodyKey.HOUSE_NUMBER_ADDITION, addressCheckPostRequest.getHouseNumberAddition());
            }
            
            final URI uri = uriBuilder.build();
            System.out.println("postnl uri: " + uri);

            final HttpRequest request = HttpRequest.newBuilder()
                    .uri(uri)
                    .GET()
                    .setHeader("Accept", "application/json")
                    .setHeader("apikey", postNlConfiguration.getApiKey())
                    .build();

            final HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode()>299 || response.body().contains("\"errors\"")) {
                throw new NoSuchElementException(response.body());
            } else {
                return objectMapper.readerForListOf(Address.class).readValue(response.body());
            }
        });
    }
    
    private String convertCountryCode(String countryIso) {
        if (countryIso == null) {
            return null;
        }
        // Convert v1 format to v2 format: BEL -> BE, NLD -> NL, etc.
        if (countryIso.length() == 3) {
            // Convert 3-letter ISO to 2-letter ISO
            if ("BEL".equalsIgnoreCase(countryIso)) {
                return "BE";
            } else if ("NLD".equalsIgnoreCase(countryIso)) {
                return "NL";
            } else if ("LUX".equalsIgnoreCase(countryIso)) {
                return "LU";
            }
        }
        // If already 2-letter or unknown, return as is
        return countryIso;
    }

    @Override
    public Try<List<Shipment>> getShippingStatuses() {
        return Try.of(() -> {
            final LocalDateTime now = LocalDateTime.now().truncatedTo(ChronoUnit.MILLIS);
            final String shipmentUrl = MessageFormat.format("/shipment/v2/status/{0}/updatedshipments?period={1}&period={2}", CUSTOMER_NUMBER, now.minusHours(2).toString(), now.toString());
            final URI uri = UriBuilder.fromUri(postNlConfiguration.getUrl().concat(shipmentUrl)).build();

            final HttpRequest request = HttpRequest.newBuilder()
                    .uri(uri)
                    .GET()
                    .setHeader("Accept", "application/json")
                    .setHeader("apikey", postNlConfiguration.getShipmentApiKey())
                    .build();

            final HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return objectMapper.readerForListOf(Shipment.class).readValue(response.body());
        });
    }
}
