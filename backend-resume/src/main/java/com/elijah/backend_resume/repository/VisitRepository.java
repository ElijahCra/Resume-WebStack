package com.elijah.backend_resume.repository;

import com.elijah.backend_resume.dto.Visit;
import org.springframework.data.repository.ListCrudRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface VisitRepository extends ListCrudRepository<Visit,Long> {
    Optional<Visit> findById(long id);

    List<Visit> findAll();
    //List<Visit> findByDate(LocalDate Date);
    //List<Visit> findVisitByVisit_date(LocalDate visit_date);
}
