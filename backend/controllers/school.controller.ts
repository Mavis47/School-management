import type { Request, Response } from 'express';
import haversine from 'haversine-distance';
import prisma from '../config/db.js';
import { z } from 'zod';

const schoolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number().min(-90, "Latitude must be between -90 and 90"),
  longitude: z.number().min(-180, "Longitude must be between -180 and 180")
});

export const AddSchool = async (req: Request, res: Response) => {
 
  const validation = schoolSchema.safeParse({
    name: req.body.name,
    address: req.body.address,
    latitude: parseFloat(req.body.latitude),
    longitude: parseFloat(req.body.longitude),
  });

  if (!validation.success) {
    return res.status(400).json({ message: 'Validation failed', errors: validation.error.errors });
  }

  const { name, address, latitude, longitude } = validation.data;

  try {
    const school = await prisma.school.create({
      data: {
        name,
        address,
        latitude,
        longitude,
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
