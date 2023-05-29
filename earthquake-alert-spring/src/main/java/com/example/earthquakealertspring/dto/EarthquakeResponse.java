package com.example.earthquakealertspring.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class EarthquakeResponse {

    private Response response;

    @Getter
    @Setter
    public static class Response {
        private Body body;
        private Header header;
    }

    @Getter
    @Setter
    public static class Body {
        private String dataType;
        private Items items;
        private Integer pageNo;
        private Integer numOfRows;
        private Integer totalCount;
    }

    @Getter
    @Setter
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Getter
    @Setter
    public static class Items {
        private List<EarthquakeDto> item;
    }
}
