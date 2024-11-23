import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Search, Filter, MapPin } from 'lucide-react';
import { format, addDays } from 'date-fns';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    specialty: 'Cardiologist',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop',
    availability: ['09:00 AM', '10:30 AM', '02:00 PM'],
  },
  {
    id: 2,
    name: 'Dr. Michael Brown',
    specialty: 'Neurologist',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=50&h=50&fit=crop',
    availability: ['11:00 AM', '01:30 PM', '03:00 PM'],
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    specialty: 'Pediatrician',
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=50&h=50&fit=crop',
    availability: ['09:30 AM', '11:30 AM', '02:30 PM'],
  },
];

const locations = [
  'Main Hospital - Downtown',
  'North Clinic',
  'South Medical Center',
  'East Wing Specialty Center',
];

export default function Appointment() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const specialties = ['Cardiologist', 'Neurologist', 'Pediatrician', 'Dermatologist', 'Orthopedist'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <h1 className="text-2xl font-semibold mb-4 lg:mb-0">Schedule Appointment</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search doctors..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedDoctor?.id === doctor.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-500'
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex items-start">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-500">{doctor.specialty}</p>
                      <div className="mt-2 flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4">Appointment Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Location
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">Select a location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                  <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    max={format(addDays(new Date(), 30), 'yyyy-MM-dd')}
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {selectedDoctor && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDoctor.availability.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2 text-sm rounded-md ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Please describe your symptoms or reason for visit..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Information
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Insurance provider and policy number"
                />
              </div>

              <button
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedDoctor || !selectedTime || !selectedLocation}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}