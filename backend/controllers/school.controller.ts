import type { Request, Response } from 'express';
import haversine from 'haversine-distance';
import prisma from '../config/db';


export const AddSchool = async (req: Request, res: Response) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate input
  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  // Parse latitude and longitude to numbers
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ message: 'Invalid latitude or longitude' });
  }

  try {
    const school = await prisma.school.create({
      data: {
        name,
        address,
        latitude: lat,
        longitude: lon,
      },
    });
    res.status(201).json({ message: 'School data added successfully', id: school.id });
  } catch (error) {
    console.error('Error adding school data:', error);
    res.status(500).json({ message: 'An error occurred while adding school data' });
  }
};

export const getSchool = async (req: Request, res: Response) => {
    const { latitude, longitude } = req.query;
    const lat = parseFloat(latitude as string);
    const lon = parseFloat(longitude as string);
  
    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ message: 'Invalid latitude or longitude' });
    }
  
    try {
      const schools = await prisma.school.findMany();
      const sortedResults = schools.map((school) => {
        const distance = haversine(
          { latitude: lat, longitude: lon },
          { latitude: school.latitude, longitude: school.longitude }
        );
        return { ...school, distance };
      }).sort((a, b) => a.distance - b.distance);
  
      res.status(200).json({
        message: 'School Data Fetched',
        All_Schools: schools,
        Distances: sortedResults,
      });
    } catch (error) {
      console.error('Error fetching school data:', error);
      res.status(500).json({ message: 'An error occurred while fetching school data' });
    }
  };


