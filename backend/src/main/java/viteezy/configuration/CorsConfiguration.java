package viteezy.configuration;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.container.PreMatching;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;

@Provider
@PreMatching
public class CorsConfiguration implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
        // Get the origin from the request
        String origin = requestContext.getHeaderString("Origin");

        // Allow localhost development origins
        if (origin != null && (origin.startsWith("http://localhost:") || origin.startsWith("https://localhost:"))) {
            responseContext.getHeaders().add("Access-Control-Allow-Origin", origin);
        } else if (origin != null && origin.equals("http://localhost:4200")) {
            responseContext.getHeaders().add("Access-Control-Allow-Origin", origin);
        } else {
            // Default fallback for development
            responseContext.getHeaders().add("Access-Control-Allow-Origin", "http://localhost:4200");
        }

        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
        responseContext.getHeaders().add("Access-Control-Allow-Headers", "origin,content-type,accept,authorization,x-requested-with");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,HEAD");
        responseContext.getHeaders().add("Access-Control-Max-Age", "1209600");

        // Handle preflight OPTIONS request
        if (requestContext.getMethod().equals("OPTIONS")) {
            responseContext.setStatus(200);
        }
    }
}
