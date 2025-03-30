// Using localStorage instead of Supabase database

// Helper function to get team members from localStorage
const getLocalTeamMembers = () => {
  const teamMembersJson = localStorage.getItem('teamMembers');
  return teamMembersJson ? JSON.parse(teamMembersJson) : [];
};

// Helper function to save team members to localStorage
const saveLocalTeamMembers = (teamMembers) => {
  localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
};

export const getTeamMembers = async () => {
  try {
    console.log('Fetching team members from localStorage...');
    const teamMembers = getLocalTeamMembers();
    // Sort by order
    teamMembers.sort((a, b) => a.order - b.order);
    console.log('Team members fetched successfully:', teamMembers.length);
    return teamMembers;
  } catch (error) {
    console.error('Exception fetching team members:', error);
    return [];
  }
};

export const addTeamMember = async (teamMember) => {
  try {
    console.log('Adding team member:', teamMember);
    const teamMembers = getLocalTeamMembers();
    
    // Create new ID (either max ID + 1 or 1 if no members yet)
    const newId = teamMembers.length > 0 
      ? Math.max(...teamMembers.map(m => m.id)) + 1 
      : 1;
    
    const memberToAdd = { 
      ...teamMember,
      id: newId,
      createdAt: new Date().toISOString()
    };
    
    teamMembers.push(memberToAdd);
    saveLocalTeamMembers(teamMembers);
    
    console.log('Team member added successfully:', memberToAdd.id);
    return memberToAdd;
  } catch (error) {
    console.error('Exception adding team member:', error);
    throw error;
  }
};

export const updateTeamMember = async (teamMember) => {
  try {
    console.log('Updating team member:', teamMember.id);
    const teamMembers = getLocalTeamMembers();
    const index = teamMembers.findIndex(m => m.id === teamMember.id);
    
    if (index === -1) {
      throw new Error(`Team member with ID ${teamMember.id} not found`);
    }
    
    // Update the member while preserving creation date
    teamMembers[index] = {
      ...teamMember,
      createdAt: teamMembers[index].createdAt,
      updatedAt: new Date().toISOString()
    };
    
    saveLocalTeamMembers(teamMembers);
    console.log('Team member updated successfully:', teamMember.id);
    return teamMembers[index];
  } catch (error) {
    console.error('Exception updating team member:', error);
    throw error;
  }
};

export const deleteTeamMember = async (id) => {
  try {
    console.log('Deleting team member:', id);
    const teamMembers = getLocalTeamMembers();
    const filteredMembers = teamMembers.filter(m => m.id !== id);
    
    if (filteredMembers.length === teamMembers.length) {
      throw new Error(`Team member with ID ${id} not found`);
    }
    
    saveLocalTeamMembers(filteredMembers);
    console.log('Team member deleted successfully');
    return true;
  } catch (error) {
    console.error('Exception deleting team member:', error);
    throw error;
  }
};

export const uploadTeamMemberImage = async (file) => {
  try {
    console.log('Processing image file...');
    
    return new Promise((resolve) => {
      // Use FileReader to convert image to data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Image converted to data URL');
        // Return the data URL as the "uploaded" image URL
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Exception processing team member image:', error);
    return '';
  }
};