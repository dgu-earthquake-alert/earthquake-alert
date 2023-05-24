package com.example.earthquakealertspring.dto;

import com.example.earthquakealertspring.dto.EarthquakeDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EarthquakeResponse {
    private Response response;

    @Getter
    @Setter
    public static class Response {
        private Body body;
    }

    @Getter
    @Setter
    public static class Body {
        private Items items;
    }

    @Getter
    @Setter
    public static class Items {
        private EarthquakeDto earthquakeDto;
    }
}

