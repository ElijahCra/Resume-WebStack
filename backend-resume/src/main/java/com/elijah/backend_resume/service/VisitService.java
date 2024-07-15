package com.elijah.backend_resume.service;

import com.elijah.backend_resume.dto.Visit;
import com.elijah.backend_resume.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VisitService {

    private final VisitRepository visitRepository;


    public Visit getSiteVisit(){
        return visitRepository.findById(2L).orElse(null);
    }

    public Visit getVisitById(Long id){
        Optional<Visit> optionalVisit = visitRepository.findById(id);
        return optionalVisit.orElse(null);
    }

    public Visit saveEmployee (Visit visit){
        visit.setVisit_date(LocalDate.now());
        visit.setDaily_visit(1);
        visit.setTotal_visit(10);
        return visitRepository.save(visit);
    }

    public Visit updateEmployee (Visit visit) {
        Optional<Visit> existingVisit = visitRepository.findById(visit.getId());
        return visitRepository.save(visit);
    }

    public void deleteEmployeeById (Long id) {
        visitRepository.deleteById(id);
    }

}