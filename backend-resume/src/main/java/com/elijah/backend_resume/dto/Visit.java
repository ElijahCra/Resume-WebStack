package com.elijah.backend_resume.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @JsonProperty("visit_date")
    @Column(nullable = false)
    private LocalDate visit_date;

    @JsonProperty("daily_visit")
    private int daily_visit;

    @JsonProperty("total_visit")
    private int total_visit;

    public Visit(LocalDate visit_date, int daily_visit, int total_visit) {
        this.visit_date = visit_date;
        this.daily_visit = daily_visit;
        this.total_visit = total_visit;
    }

}
