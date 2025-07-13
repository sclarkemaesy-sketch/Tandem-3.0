import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

export interface QuizSet {
  id?: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

/**
 * Upload a quiz set to Firestore
 * @param quizSet - The quiz set to upload
 * @returns Promise<string> - The ID of the created quiz set
 */
export async function uploadQuizSet(quizSet: Omit<QuizSet, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const now = new Date();
    const quizSetData: Omit<QuizSet, 'id'> = {
      ...quizSet,
      createdAt: now,
      updatedAt: now
    };

    // Use collection() with the db instance and collection name
    const quizSetsCollection = collection(db, 'questionBanks');
    const docRef = await addDoc(quizSetsCollection, quizSetData);
    
    console.log('Quiz set uploaded successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error uploading quiz set:', error);
    throw new Error(`Failed to upload quiz set: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get quiz sets by creator
 * @param createdBy - The user ID who created the quiz sets
 * @returns Promise<QuizSet[]> - Array of quiz sets
 */
export async function getQuizSetsByCreator(createdBy: string): Promise<QuizSet[]> {
  try {
    const quizSetsCollection = collection(db, 'questionBanks');
    const q = query(quizSetsCollection, where('createdBy', '==', createdBy));
    const querySnapshot = await getDocs(q);
    
    const quizSets: QuizSet[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      quizSets.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as QuizSet);
    });
    
    return quizSets;
  } catch (error) {
    console.error('Error fetching quiz sets:', error);
    throw new Error(`Failed to fetch quiz sets: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Update an existing quiz set
 * @param quizSetId - The ID of the quiz set to update
 * @param updates - Partial quiz set data to update
 * @returns Promise<void>
 */
export async function updateQuizSet(quizSetId: string, updates: Partial<Omit<QuizSet, 'id' | 'createdAt'>>): Promise<void> {
  try {
    const quizSetRef = doc(db, 'questionBanks', quizSetId);
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };
    
    await updateDoc(quizSetRef, updateData);
    console.log('Quiz set updated successfully');
  } catch (error) {
    console.error('Error updating quiz set:', error);
    throw new Error(`Failed to update quiz set: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}