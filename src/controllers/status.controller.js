StatusController = {
    status: async (req, res) => {
        res.json({status: "ok"});
    },
    auth: async (req, res) => {
        res.json({status: "ok"});
    }
}

module.exports = StatusController;