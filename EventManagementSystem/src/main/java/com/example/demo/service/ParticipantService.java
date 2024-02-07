package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Participants;

public interface ParticipantService {

    void addParticipant(Participants participant);

    void deleteById(long id);

    void updateParticipant(Participants updatedParticipant);

    List<Participants> findAll();

    List<Participants> findByUsername(String username); // Renamed for consistency

    Participants getParticipantByUsername(String username); // Renamed for consistency

    Optional<Participants> findParticipantById(long id); // Renamed for consistency

}
