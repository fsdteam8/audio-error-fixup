import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const MaterialsTab = ({ materials, setMaterials, user }) => {
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    level: 'beginner',
    type: 'lesson'
  });

  const saveMaterials = (updatedMaterials) => {
    localStorage.setItem('teacher_materials', JSON.stringify(updatedMaterials));
    setMaterials(updatedMaterials);
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    const material = {
      id: Date.now(),
      ...newMaterial,
      createdAt: new Date().toISOString(),
      author: user.name
    };
    
    const updatedMaterials = [...materials, material];
    saveMaterials(updatedMaterials);
    
    setNewMaterial({
      title: '',
      description: '',
      level: 'beginner',
      type: 'lesson'
    });
    
    toast({
      title: "Material added! 📚",
      description: "Your new learning material has been successfully uploaded.",
    });
  };

  const handleDeleteMaterial = (id) => {
    const updatedMaterials = materials.filter(material => material.id !== id);
    saveMaterials(updatedMaterials);
    toast({
      title: "Material deleted",
      description: "The learning material has been removed.",
    });
  };

  const handleFileUpload = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-1"
      >
        <Card className="reading-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Plus className="h-5 w-5 mr-2 text-blue-400" />
              Add New Material
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMaterial} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">Title</Label>
                <Input
                  id="title"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Lesson title"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <textarea
                  id="description"
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 resize-none"
                  placeholder="Brief description of the material"
                />
              </div>

              <div>
                <Label htmlFor="level" className="text-white">Level</Label>
                <select
                  id="level"
                  value={newMaterial.level}
                  onChange={(e) => setNewMaterial({...newMaterial, level: e.target.value})}
                  className="w-full h-10 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                >
                  <option value="beginner" className="text-black">Beginner</option>
                  <option value="intermediate" className="text-black">Intermediate</option>
                  <option value="advanced" className="text-black">Advanced</option>
                </select>
              </div>

              <div>
                <Label htmlFor="type" className="text-white">Type</Label>
                <select
                  id="type"
                  value={newMaterial.type}
                  onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
                  className="w-full h-10 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                >
                  <option value="lesson" className="text-black">Lesson</option>
                  <option value="exercise" className="text-black">Exercise</option>
                  <option value="assessment" className="text-black">Assessment</option>
                  <option value="resource" className="text-black">Resource</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Add Material
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/20">
              <Button 
                onClick={handleFileUpload}
                variant="outline" 
                className="w-full text-white border-white hover:bg-white hover:text-purple-600"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="lg:col-span-2"
      >
        <Card className="reading-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-400" />
              Your Materials ({materials.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {materials.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60">No materials uploaded yet</p>
                <p className="text-white/40 text-sm">Add your first learning material using the form</p>
              </div>
            ) : (
              <div className="space-y-4">
                {materials.map((material) => (
                  <div key={material.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{material.title}</h3>
                        <p className="text-white/70 text-sm mt-1">{material.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded capitalize">
                            {material.level}
                          </span>
                          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded capitalize">
                            {material.type}
                          </span>
                          <span className="text-white/50 text-xs">
                            {new Date(material.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white/60 hover:text-white hover:bg-white/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteMaterial(material.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MaterialsTab;