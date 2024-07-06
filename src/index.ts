import { GitFusionPlugin } from './git-fusion';
const gitFusion = new GitFusionPlugin();
process.env.NODE_GIT_FUSION_FILE_TYPE === 'json' ? gitFusion.createJsonFile() : gitFusion.createFile();

export default gitFusion;
