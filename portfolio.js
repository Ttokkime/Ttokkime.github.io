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
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    const projectGrid = document.getElementById('project-grid');
    if (projectGrid) {
      projectGrid.innerHTML = '<p class="text-sm text-zinc-500">Unable to load projects. Check if data.json exists in the root folder.</p>';
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
      </div>
      <p class="mt-2 text-sm leading-relaxed text-zinc-600">${project.description}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        ${(project.technologies || []).map(tech => `
          <span class="rounded-full border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-600">${tech}</span>
        `).join('')}
      </div>
      <div class="mt-5 flex gap-4 items-center">
        ${project.github ? `
          <a href="${project.github}" target="_blank" rel="noreferrer" class="text-zinc-600 hover:text-zinc-900 transition-colors" aria-label="GitHub Repository">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        ` : ''}
      </div>
    `;

    projectGrid.appendChild(projectCard);
  });
}

// Load data when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPortfolioData);
} else {
  loadPortfolioData();
}