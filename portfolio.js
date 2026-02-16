/**
 * Fetch and populate portfolio data from data.json
 */
async function loadPortfolioData() {
  try {
    // UPDATED: Changed path to './data.json' to ensure it finds the file in the root
    const response = await fetch('./data.json');
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
    const projectGrid = document.getElementById('project-grid');
    const skillsContainer = document.getElementById('skills-container');
    if (projectGrid) {
      projectGrid.innerHTML = '<p class="text-sm text-zinc-500">Unable to load projects. Check if data.json exists in the root folder.</p>';
    }
    if (skillsContainer) {
      skillsContainer.innerHTML = '<p class="text-sm text-zinc-500">Unable to load skills. Please try again later.</p>';
    }
  }
}

/**
 * Create Tailwind CSS cards for each project
 */
function populateProjects(projects) {
  const projectGrid = document.getElementById('project-grid');
  if (!projectGrid) return;

  projectGrid.innerHTML = '';

  projects.forEach(project => {
    const projectCard = document.createElement('article');
    projectCard.className = 'rounded-2xl border border-zinc-200 p-5 hover:border-zinc-300 hover:bg-zinc-50 transition-colors';

    // Build the internal HTML using a template literal for better readability
    projectCard.innerHTML = `
      <div class="flex items-center justify-between gap-4">
        <h3 class="font-medium tracking-tight text-zinc-900">${project.name}</h3>
        ${project.date ? `<span class="inline-flex items-center rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs font-medium text-zinc-600">${project.date}</span>` : ''}
      </div>
      <p class="mt-2 text-sm leading-relaxed text-zinc-600">${project.description}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        ${(project.technologies || []).map(tech => `
          <span class="rounded-full border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-600">${tech}</span>
        `).join('')}
      </div>
      <div class="mt-5 flex gap-4">
        ${project.github ? `<a href="${project.github}" target="_blank" rel="noreferrer" class="text-sm text-zinc-700 hover:text-zinc-900 underline underline-offset-4 transition-colors">GitHub</a>` : ''}
        ${project.url ? `<a href="${project.url}" target="_blank" rel="noreferrer" class="text-sm text-zinc-700 hover:text-zinc-900 underline underline-offset-4 transition-colors">Live Demo</a>` : ''}
      </div>
    `;

    projectGrid.appendChild(projectCard);
  });
}

/**
 * Create professional skill sections with badges
 */
function populateSkills(skills) {
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;

  skillsContainer.innerHTML = '';

  Object.keys(skills).forEach(category => {
    const skillsArray = skills[category];
    if (!Array.isArray(skillsArray) || skillsArray.length === 0) return;

    const categorySection = document.createElement('div');
    categorySection.className = 'mb-10 last:mb-0';

    categorySection.innerHTML = `
      <h3 class="text-sm font-semibold tracking-tight uppercase text-zinc-900 mb-4">${category}</h3>
      <div class="flex flex-wrap gap-2.5">
        ${skillsArray.map(skill => `
          <span class="inline-flex items-center rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-100 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200">
            ${skill}
          </span>
        `).join('')}
      </div>
    `;

    skillsContainer.appendChild(categorySection);
  });
}

// Load data when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPortfolioData);
} else {
  loadPortfolioData();
}