const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = function(db) {
    router.put("/changePassword/:userId", async (req, res) => {
        const userId = parseInt(req.params.userId);
        const { password, newPassword, confirmNewPassword } = req.body;

        try {
            const user = await db.collection("userData").findOne({ user_id: userId });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).json({ error: "Current password is incorrect" });
            }

            if (newPassword !== confirmNewPassword) {
                return res.status(400).json({ error: "New passwords do not match" });
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            await db.collection("userData").updateOne({ user_id: userId }, { $set: { password: hashedNewPassword } });

            res.status(200).json({ message: "Password updated successfully" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};
