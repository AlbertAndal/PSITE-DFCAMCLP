import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getTeamMembers, 
  addTeamMember, 
  updateTeamMember, 
  deleteTeamMember,
  uploadTeamMemberImage 
} from '../services/teamService';

const TeamContext = createContext();

export const useTeam = () => {
  return useContext(TeamContext);
};

// Sample team data for initial load if localStorage is empty
const sampleTeamMembers = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    position: "Chairperson",
    order: 1,
    imageUrl: "https://i.pravatar.cc/300?img=1",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Prof. Michael Johnson",
    position: "Vice Chairperson",
    order: 2,
    imageUrl: "https://i.pravatar.cc/300?img=2",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    position: "Secretary",
    order: 3,
    imageUrl: "https://i.pravatar.cc/300?img=3",
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Prof. Robert Brown",
    position: "Treasurer",
    order: 4,
    imageUrl: "https://i.pravatar.cc/300?img=4",
    createdAt: new Date().toISOString()
  }
];

// Function to load sample data if needed
const loadSampleDataIfNeeded = () => {
  const teamMembersJson = localStorage.getItem('teamMembers');
  if (!teamMembersJson || JSON.parse(teamMembersJson).length === 0) {
    localStorage.setItem('teamMembers', JSON.stringify(sampleTeamMembers));
    console.log("Sample team members loaded");
  }
};

export const TeamProvider = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load sample data if localStorage is empty
    loadSampleDataIfNeeded();
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const data = await getTeamMembers();
      setTeamMembers(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching team members:", err);
      setError('Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (newMember, imageFile) => {
    try {
      let imageUrl = newMember.imageUrl || '';
      
      // If there's a new image file, process it
      if (imageFile) {
        imageUrl = await uploadTeamMemberImage(imageFile);
      }
      
      // Add the member with the image URL
      const addedMember = await addTeamMember({
        ...newMember,
        imageUrl
      });
      
      setTeamMembers(prev => [...prev, addedMember].sort((a, b) => a.order - b.order));
      return addedMember;
    } catch (err) {
      console.error("Add team member failed:", err);
      setError('Failed to add team member');
      throw err;
    }
  };

  const updateMember = async (updatedMember, imageFile) => {
    try {
      let imageUrl = updatedMember.imageUrl || '';
      
      // If there's a new image file, process it
      if (imageFile) {
        imageUrl = await uploadTeamMemberImage(imageFile);
      }
      
      // Update the member with the image URL if there's a new one
      const result = await updateTeamMember({
        ...updatedMember,
        imageUrl: imageFile ? imageUrl : updatedMember.imageUrl
      });
      
      setTeamMembers(prev => 
        prev.map(member => member.id === updatedMember.id ? result : member)
           .sort((a, b) => a.order - b.order)
      );
      
      return result;
    } catch (err) {
      console.error("Update team member failed:", err);
      setError('Failed to update team member');
      throw err;
    }
  };

  const removeMember = async (id) => {
    try {
      await deleteTeamMember(id);
      setTeamMembers(prev => prev.filter(member => member.id !== id));
      return true;
    } catch (err) {
      console.error("Delete team member failed:", err);
      setError('Failed to delete team member');
      throw err;
    }
  };

  const resetToSampleData = () => {
    localStorage.setItem('teamMembers', JSON.stringify(sampleTeamMembers));
    fetchTeamMembers();
  };

  const value = {
    teamMembers,
    loading,
    error,
    addMember,
    updateMember, 
    removeMember,
    refreshTeamMembers: fetchTeamMembers,
    resetToSampleData
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
};