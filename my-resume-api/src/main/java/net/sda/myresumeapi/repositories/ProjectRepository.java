package net.sda.myresumeapi.repositories;

import net.sda.myresumeapi.entities.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectRepository extends MongoRepository<Project, String> {}

