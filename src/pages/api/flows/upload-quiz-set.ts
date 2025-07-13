import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadQuizSet } from '../../../ai/flows/upload-quiz-set-flow';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, description, questions, createdBy } = req.body;

    if (!title || !description || !questions || !createdBy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const quizSetId = await uploadQuizSet({
      title,
      description,
      questions,
      createdBy
    });

    res.status(200).json({ 
      success: true, 
      quizSetId,
      message: 'Quiz set uploaded successfully' 
    });
  } catch (error) {
    console.error('Upload quiz set error:', error);
    res.status(500).json({ 
      error: 'Failed to upload quiz set',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}