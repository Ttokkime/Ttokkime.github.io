/**
 * Fetch and populate portfolio data from data.json
 */
async function loadPortfolioData() {
  try {
    const response = await fetch('../data.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch data.json: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    if (data.projects && Array.isArray(data.projects)) {
      populateProjects(data.projects);
    }
    
    if (data.skills && typeof data.skills === 'object') {
      populateSkills(data.skills);
    }
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    // Display error message to user
    const projectGrid = document.getElementById('project-grid');
    const skillsContainer = document.getElementById('skills-container');
    if (projectGrid) {
      projectGrid.innerHTML = '<p class="text-sm text-zinc-500">Unable to load projects. Please try again later.</p>';
    }
    if (skillsContainer) {
      skillsContainer.innerHTML = '<p class="text-sm text-zinc-500">Unable to load skills. Please try again later.</p>';
    }
  }
}

/**
 * Create Tailwind CSS cards for each project
 * @param {Array} projects - Array of project objects
 */
function populateProjects(projects) {
  const projectGrid = document.getElementById('project-grid');
  if (!projectGrid) {
    console.error('Project grid container not found');
    return;
  }

  projectGrid.innerHTML = '';

  projects.forEach(project => {
    // Create project card article element
    const projectCard = document.createElement('article');
    projectCard.className = 'rounded-2xl border border-zinc-200 p-5 hover:border-zinc-300 hover:bg-zinc-50 transition-colors';

    // Card header with title and date
    const header = document.createElement('div');
    header.className = 'flex items-center justify-between gap-4';
    
    const title = document.createElement('h3');
    title.className = 'font-medium tracking-tight text-zinc-900';
    title.textContent = project.name;
    header.appendChild(title);

    if (project.date) {
      const dateBadge = document.createElement('span');
      dateBadge.className = 'inline-flex items-center rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs font-medium text-zinc-600';
      dateBadge.textContent = project.date;
      header.appendChild(dateBadge);
    }

    // Project description
    const description = document.createElement('p');
    description.className = 'mt-2 text-sm leading-relaxed text-zinc-600';
    description.textContent = project.description;

    // Technologies tags container
    const technologiesContainer = document.createElement('div');
    technologiesContainer.className = 'mt-4 flex flex-wrap gap-2';
    
    if (project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0) {
      project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'rounded-full border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-600';
        techTag.textContent = tech;
        technologiesContainer.appendChild(techTag);
      });
    }

    // Links container (GitHub and Live Demo)
    const linksContainer = document.createElement('div');
    linksContainer.className = 'mt-5 flex gap-4';

    if (project.github) {
      const githubLink = document.createElement('a');
      githubLink.href = project.github;
      githubLink.target = '_blank';
      githubLink.rel = 'noreferrer';
      githubLink.className = 'text-sm text-zinc-700 hover:text-zinc-900 underline underline-offset-4 transition-colors';
      githubLink.textContent = 'GitHub';
      linksContainer.appendChild(githubLink);
    }

    if (project.url) {
      const urlLink = document.createElement('a');
      urlLink.href = project.url;
      urlLink.target = '_blank';
      urlLink.rel = 'noreferrer';
      urlLink.className = 'text-sm text-zinc-700 hover:text-zinc-900 underline underline-offset-4 transition-colors';
      urlLink.textContent = 'Live Demo';
      linksContainer.appendChild(urlLink);
    }

    // Assemble card
    projectCard.appendChild(header);
    projectCard.appendChild(description);
    projectCard.appendChild(technologiesContainer);
    if (linksContainer.children.length > 0) {
      projectCard.appendChild(linksContainer);
    }

    projectGrid.appendChild(projectCard);
  });
}

/**
 * Create professional skill sections with badges for each category
 * @param {Object} skills - Object with skill categories as keys and arrays of skills as values
 */
function populateSkills(skills) {
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) {
    console.error('Skills container not found');
    return;
  }

  skillsContainer.innerHTML = '';

  // Loop through each skill category
  Object.keys(skills).forEach(category => {
    const skillsArray = skills[category];
    if (!Array.isArray(skillsArray) || skillsArray.length === 0) {
      return; // Skip empty categories
    }

    // Create category section
    const categorySection = document.createElement('div');
    categorySection.className = 'mb-10 last:mb-0';

    // Category title
    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'text-sm font-semibold tracking-tight uppercase text-zinc-900 mb-4';
    categoryTitle.textContent = category;
    categorySection.appendChild(categoryTitle);

    // Skills list container
    const skillsList = document.createElement('div');
    skillsList.className = 'flex flex-wrap gap-2.5';

    // Loop through skills in this category and create badges
    skillsArray.forEach(skill => {
      const skillBadge = document.createElement('span');
      // Professional dark-themed badge styling
      skillBadge.className = 'inline-flex items-center rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-100 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200';
      skillBadge.textContent = skill;
      skillsList.appendChild(skillBadge);
    });

    categorySection.appendChild(skillsList);
    skillsContainer.appendChild(categorySection);
  });
}

// Load portfolio data when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPortfolioData);
} else {
  loadPortfolioData();
}
