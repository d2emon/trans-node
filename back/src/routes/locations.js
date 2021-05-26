import express from 'express';
import {
    getLocations,
    addLocation,
    getLocation,
    updateLocation,
    removeLocation,
} from '../handlers/location';

const router = express.Router();

router.get('/', getLocations);
router.post('/', addLocation);
router.get('/:id', getLocation);
router.put('/:id', updateLocation);
router.delete('/:id', removeLocation);

export default router;
