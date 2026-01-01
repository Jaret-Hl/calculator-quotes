export async function loadModule(moduleName) {
  try {
    const module = await import(`../modules/${moduleName}.js`);
    return module;
  } catch (error) {
    console.error(`Error loading module ${moduleName}:`, error);
    return null;
  }
}
