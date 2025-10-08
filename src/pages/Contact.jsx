import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: 'individual'
  });
  const handleSubmit = e => {
    e.preventDefault();
    toast({
      title: "Message sent! 📧",
      description: "Thank you for your interest. We'll get back to you within 24 hours."
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      serviceType: 'individual'
    });
  };
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const services = [{
    title: 'Individual Tutoring',
    description: 'One-on-one personalized reading instruction tailored to your specific needs and learning pace.',
    features: ['Personalized lesson plans', 'Flexible scheduling', 'Progress assessments', 'Take-home materials']
  }, {
    title: 'Small Group Sessions',
    description: 'Learn with 2-4 other students in a supportive group environment.',
    features: ['Interactive group activities', 'Peer learning support', 'Cost-effective option', 'Social learning environment']
  }];
  const contactInfo = [{
    icon: Phone,
    title: 'Phone',
    value: '+1 (658) 206-9545, +1 (954) 687-1247',
    description: 'Call us for inquiries'
  }, {
    icon: MapPin,
    title: 'Location',
    value: 'Mandeville, Jamaica',
    description: 'Our primary location'
  }];
  return <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Personal Tutoring
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Take your reading skills to the next level with personalized one-on-one instruction 
            from our experienced literacy educators.
          </p>
        </motion.div>

        {/* Services Section */}
        <div className="mb-16">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Tutoring Services
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 justify-center">
            {services.map((service, index) => <motion.div key={service.title} initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3 + index * 0.1
          }}>
                <Card className="reading-card h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-gray-900">{service.title}</CardTitle>
                    </div>
                    <p className="text-gray-700 text-sm">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => <li key={idx} className="text-gray-600 text-sm flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </li>)}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
            <Card className="reading-card">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  Request Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-800">Full Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-white/50 border-gray-300 text-gray-800 placeholder:text-gray-500" placeholder="Your full name" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-800">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-white/50 border-gray-300 text-gray-800 placeholder:text-gray-500" placeholder="your@email.com" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-gray-800">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="bg-white/50 border-gray-300 text-gray-800 placeholder:text-gray-500" placeholder="(555) 123-4567" />
                  </div>

                  <div>
                    <Label htmlFor="serviceType" className="text-gray-800">Service Interest</Label>
                    <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full h-10 px-3 py-2 bg-white/50 border border-gray-300 rounded-md text-gray-800">
                      <option value="individual" className="text-black">Individual Tutoring</option>
                      <option value="group" className="text-black">Small Group Sessions</option>
                      <option value="consultation" className="text-black">Free Consultation</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-800">Message</Label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-500 resize-none" placeholder="Tell us about your reading goals and any specific areas you'd like to focus on..." />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.5
        }} className="space-y-6">
            <Card className="reading-card">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Meet Your Instructor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <img className="w-20 h-20 rounded-full object-cover" alt="Janett Brown, Reading Specialist" src="https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/e2fe40c0b7b9bad41263387bc6bb68a6.jpg" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Janett Brown</h3>
                    <p className="text-blue-600 text-sm mb-2">Educator/Instructor</p>
                    <p className="text-gray-700 text-sm">With over a decade of experience to her credit, Janett is a part-time educator and instructor, proficient in adult literacy. She has attained TESOL/TEFL accreditation and TABE certification from the Jamaican Foundation for Lifelong Learning. An enthusiastic reader and a patient mentor, she is dedicated to fostering a supportive learning environment.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {contactInfo.map((info, index) => <motion.div key={info.title} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: 0.6 + index * 0.1
          }}>
                <Card className="reading-card">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <info.icon className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        <p className="text-gray-800">{info.value}</p>
                        <p className="text-gray-600 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}

            <Card className="reading-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Free Consultation</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Not sure which service is right for you? Schedule a free 15-minute consultation 
                  to discuss your goals and find the perfect learning plan.
                </p>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Schedule Free Consultation
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>;
};
export default Contact;