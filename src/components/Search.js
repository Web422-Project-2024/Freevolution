import { gameSearchAtom, overallGameDataAtom } from "@/store/atoms";
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import styles from "@/styles/Search.module.css"

export default function Search() {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset} = useForm();
  const [ gameSearch, setGameSearch ] = useAtom(gameSearchAtom);
  const [ overallGameData, setOverallGameData ] = useAtom(overallGameDataAtom);
  const router = useRouter();

  async function submitForm(data) {
    try {
      clearErrors('input');
      const input = data.input.trim();

      if (input.length === 0) {
          throw new Error('Input cannot be empty.');
      }

      if (Number.isInteger(Number(input))) {
          setGameSearch({id: input});
      } 

      await setOverallGameData();
      reset({ input: '' });
      router.push(`/game/${input}`);
    } catch (error) {
        console.error('Error in game search:', error);
          setError('input', {
            type: 'manual',
            message: error.message || 'An error occurred. Please try again.',
        });
      }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className={styles.searchContainer}>
          <div className={styles.inputContainer}>
            <input 
              {...register('input', {
                required: 'Input is required.',
                validate: (value) => {
                  if (value.trim().length === 0) {
                    return 'Input cannot be empty.';
                  }
                  return true;
                }
              })}
              placeholder="Search by game ID"
              className={styles.input}
            />
            <button type="submit" className={styles.searchButton}>
              <div className={styles.searchIcon}>
                <div className={styles.searchIconInner}><Image src="/search.png" alt="My Icon" width={25} height={24} /></div>
              </div>
            </button>
          </div>
        </div>
      </form>
      {errors.input && <p className={styles.errorMessage}>{errors.input.message}</p>}
    </div>
  )
}