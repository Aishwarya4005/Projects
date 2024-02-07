package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.ParticipantDao;
import com.example.demo.entity.Participants;
import com.example.demo.exception.UserAlreadyExistException;

@Service
public class ParticipantServiceImpl implements ParticipantService {

    @Autowired
    private ParticipantDao dao;

    @Override
    public void deleteById(long id) {
        dao.deleteById(id);
    }

    @Override
    public List<Participants> findAll() {
        return dao.findAll();
    }

    @Override
    public void updateParticipant(Participants updatedParticipant) {
        dao.save(updatedParticipant);
    }

    @Override
    public List<Participants> findByUsername(String username) {
        return dao.findByUsername(username);
    }

    @Override
    public void addParticipant(Participants participant) {
        if (dao.existsByUsername(participant.getUsername())) {
            throw new UserAlreadyExistException("Username '" + participant.getUsername() + "' already exists.");
        } else {
            dao.save(participant);
        }
    }

    @Override
    public Participants getParticipantByUsername(String username) {
        return dao.findParticipantByUsername(username);
    }

    @Override
    public Optional<Participants> findParticipantById(long id) {
        return dao.findById(id);
    }
}

