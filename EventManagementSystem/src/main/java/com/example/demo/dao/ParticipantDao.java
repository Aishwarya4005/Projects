package com.example.demo.dao;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Participants;

@Repository
public interface ParticipantDao extends JpaRepository<Participants, Long> {

    Optional<Participants> findByParticipantId(Long id); // Renamed from findById to follow naming conventions

    Optional<Participants> findByName(String participantUsername); // Renamed for consistency

    List<Participants> findByUsername(String username);

    boolean existsByUsername(String username);
    Participants findParticipantByUsername(String username);

    // Add other custom query methods as needed

}
