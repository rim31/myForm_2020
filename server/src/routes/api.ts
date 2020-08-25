import { Router } from "express";
const router: Router = Router();
import { getQuestions, getQuestion, postQuestion, updateQuestion, deleteQuestion } from '../controllers/question.controller';
import { getAnswers, getAnswer, postAnswer, updateAnswer, deleteAnswer } from '../controllers/answer.controller';

// note : add here function for checking authentication after the path

// ======== question =========
router.get('/q/', getQuestions);
router.post('/q/', postQuestion);
router.get('/q/:id', getQuestion);
router.put('/q/:id', updateQuestion);
router.delete('/q/:id', deleteQuestion);

// ======== answer =========
router.get('/', getAnswers);
router.post('/', postAnswer);
router.get('/:id', getAnswer);
router.put('/:id', updateAnswer);
router.delete('/:id', deleteAnswer);

export default router;