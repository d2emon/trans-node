import Location from '../models/location';

export const getLocations = async (req, res) => {
    try {
        const query = {};
        const locations = await Location.find(query);
        return res.json({ locations });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const addLocation = async (req, res) => {
    try {
        const record = new Location(req.body);
        const result = await record.save();
        return res.json({ result });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const getLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        return res.json({ location });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const updateLocation = async (req, res) => {
    try {
        const result = await Location.findByIdAndUpdate(req.params.id, req.body);
        return res.json({ result });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const removeLocation = async (req, res) => {
    try {
        const result = await Location.findByIdAndDelete(req.params.id);
        return res.json({ result });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
