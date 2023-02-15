import {
  Tree,
  formatFiles,
  getProjects,
  names,
  generateFiles,
  installPackagesTask,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/angular/generators';
import { join } from 'path';

export default async function (host: Tree, schema: any) {
  const [ libDir, libName ] = schema.name.split('/');
  const formattedNames = names(libName);
  const formattedDirNames = names(libDir);

  await libraryGenerator(host, { name: 'feature-' + formattedNames.fileName, directory: libDir});

  const projects = getProjects(host);

  const dirAndName = `${libDir}-feature-${formattedNames.fileName}`;
  const project = projects.get(dirAndName);

  const variables = {
    ...names(libName),
    dirAndName,
    classDir: formattedDirNames.className,
    name: libName,
    tmpl: '',
  };

  await generateFiles(host, join(__dirname, 'files'), `${project?.root}/src/lib`, variables);

  host.delete(`${project.root}/src/index.ts`);

  await generateFiles(host, join(__dirname, 'src-files'), `${project?.root}/src`, variables);
  
  await formatFiles(host);

  host.delete(`${project.root}/src/lib/${dirAndName}.module.ts`);
  host.delete(`${project.root}/src/lib/${dirAndName}.spec.ts`);

  return () => {
    installPackagesTask(host);
  };
}

