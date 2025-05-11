package com.klef.fsd.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.fsd.project.model.Donation;
import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation,Integer>
{
	public List<Donation> findByCategory(String category);
}