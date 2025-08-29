import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Mail, Phone, MapPin, Globe, DollarSign, Calendar, Clock, Languages } from "lucide-react";

const timezones = ["UTC", "Asia/Kolkata", "America/New_York", "Europe/London"];
const currencies = ["USD", "EUR", "INR", "GBP"];
const dateFormats = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
const timeFormats = ["12h", "24h"];
const languages = ["en", "fr", "es", "de", "hi"];

const GeneralSettings: React.FC = () => {
    const [settings, setSettings] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    axios.defaults.baseURL = "http://localhost:5000";

    useEffect(() => {
        axios.get("/api/settings").then((res) => {
            setSettings(res.data);
            if (!res.data) {
                setIsEditing(true); // if nothing exists, show form
            }
        });
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        await axios.put("/api/settings", settings);
        alert("Settings saved!");
        setIsEditing(false);
    };

    if (!settings) return <p>Loading...</p>;

    return (
        <div className="p-6 flex justify-center  items-center">
            {!isEditing ? (
                // CARD VIEW MODE
                <Card
                    className="backdrop-blur-xl bg-white/60 border border-white/20 shadow-2xl rounded-2xl max-w-2xl w-full"
                >
                    <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                            {settings.logoUrl && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={settings.logoUrl}
                                        alt="Logo"
                                        className="h-20 w-20 rounded-xl object-contain shadow-md"
                                    />
                                </div>
                            )}

                            {/* Company Info */}
                            <div className="flex-1 space-y-2 text-gray-800">
                                <h2 className="text-2xl font-bold tracking-wide">
                                    {settings.companyName}
                                </h2>
                                <p className="text-sm flex items-center gap-2">
                                    <MapPin size={16} className="text-gray-500" />{" "}
                                    {settings.address || "-"}
                                </p>
                                <p className="text-sm flex items-center gap-2">
                                    <Mail size={16} className="text-gray-500" />{" "}
                                    {settings.contactEmail || "-"}
                                </p>
                                <p className="text-sm flex items-center gap-2">
                                    <Phone size={16} className="text-gray-500" />{" "}
                                    {settings.contactPhone || "-"}
                                </p>
                            </div>
                        </div>

                        {/* Bottom Info */}
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-gray-700">
                            <p className="flex items-center gap-2">
                                <Globe size={14} className="text-gray-500" /> {settings.timezone}
                            </p>
                            <p className="flex items-center gap-2">
                                <DollarSign size={14} className="text-gray-500" /> {settings.currency}
                            </p>
                            <p className="flex items-center gap-2">
                                <Calendar size={14} className="text-gray-500" /> {settings.dateFormat}
                            </p>
                            <p className="flex items-center gap-2">
                                <Clock size={14} className="text-gray-500" /> {settings.timeFormat}
                            </p>
                            <p className="flex items-center gap-2">
                                <Languages size={14} className="text-gray-500" /> {settings.language}
                            </p>
                        </div>

                        {/* Edit Button */}
                        <div className="mt-6 text-right">
                            <Button
                                onClick={() => setIsEditing(true)}
                                className="rounded-xl px-6 bg-gray-800/20 hover:bg-gray-800/30 text-gray-900 backdrop-blur-md"
                            >
                                Edit
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            ) : (
                // EDIT/CREATE FORM MODE
                <Card className="shadow-md border rounded-xl max-w-2xl w-full">
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                name="companyName"
                                value={settings.companyName || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Logo URL</Label>
                            <Input
                                name="logoUrl"
                                value={settings.logoUrl || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Address</Label>
                            <Input
                                name="address"
                                value={settings.address || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Contact Email</Label>
                            <Input
                                name="contactEmail"
                                value={settings.contactEmail || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Contact Phone</Label>
                            <Input
                                name="contactPhone"
                                value={settings.contactPhone || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Timezone</Label>
                            <select
                                name="timezone"
                                value={settings.timezone}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            >
                                {timezones.map((tz) => (
                                    <option key={tz} value={tz}>
                                        {tz}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label>Currency</Label>
                            <select
                                name="currency"
                                value={settings.currency}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            >
                                {currencies.map((cur) => (
                                    <option key={cur} value={cur}>
                                        {cur}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label>Date Format</Label>
                            <select
                                name="dateFormat"
                                value={settings.dateFormat}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            >
                                {dateFormats.map((df) => (
                                    <option key={df} value={df}>
                                        {df}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label>Time Format</Label>
                            <select
                                name="timeFormat"
                                value={settings.timeFormat}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            >
                                {timeFormats.map((tf) => (
                                    <option key={tf} value={tf}>
                                        {tf}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label>Language</Label>
                            <select
                                name="language"
                                value={settings.language}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            >
                                {languages.map((lang) => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <Button onClick={handleSave}>Save</Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default GeneralSettings;
