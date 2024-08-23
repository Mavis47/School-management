import type { Request,Response } from 'express'
import { db } from '../config/db.js';
import haversine from 'haversine-distance';

export const AddSchool = (req: Request, res: Response) => {
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

    const query = "INSERT INTO school_data (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

    db.query(query, [name, address, lat, lon], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            return res.status(500).json({ message: 'Failed to add school data' });
        }

        // Send success response
        res.status(201).json({ message: 'School data added successfully', id: results });
    });
};


export const getSchool = (req: Request, res: Response) => {
    console.log("Request Body:", req.query);

    const { latitude, longitude } = req.query;
    const lat = parseFloat(latitude as string);
    const lon = parseFloat(longitude as string);

    console.log("Parsed Latitude:", lat);
    console.log("Parsed Longitude:", lon);

    if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ message: 'Invalid latitude or longitude' });
    }

    const query = "SELECT * FROM school_data";
    console.log("SQL Query:", query);
    console.log("Query Parameters:", [lat, lon]);

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            return res.status(500).json({ message: 'Failed to fetch school data' });
        }

        if(Array.isArray(results)) {
            const sortedResults = results.map((school: any) => {
                const distance = haversine(
                    { latitude: lat, longitude: lon },
                    { latitude: school.latitude, longitude: school.longitude }
                );
                return { ...school, distance };
            }).sort((a: any, b: any) => a.distance - b.distance);
    
            console.log('Query Results:', sortedResults);
    
           return res.status(200).json({ message: "School Data Fetched",All_Schools : results,Distances: sortedResults });
        }else{
            return res.status(500).json({ message: 'Unexpected query result type' });
        }
       
    });
};

export const getAll = (req: Request, res: Response) => {
    const query = "SELECT * FROM school_data";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            return res.status(500).json({ message: 'Failed to fetch school data' });
        }

        console.log('Query Results:', results);

        res.status(200).json({ message: "School Data Fetched", results });
    });
};
