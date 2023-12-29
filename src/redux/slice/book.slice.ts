import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBook, fetchBooks } from 'redux/actions/book.actions';
import { GetBooksResponse, SliceName } from 'redux/types';

interface BookState {
  currentBook: IBook | null; //book in detail screen
  bookList: IBook[];
  isLoading: boolean;
  pagination: IPagination;
}

const initialState: BookState = {
  bookList: [],
  isLoading: false,
  pagination: {
    currentPage: 0,
    hasNext: false,
    itemCount: 0,
    pageCount: 0,
  },
  currentBook: null,
};

const bookSlice = createSlice({
  name: SliceName.Book,
  initialState: initialState,
  reducers: {
    cleanBookList: state => {
      state.bookList = [];
      state.pagination = {
        currentPage: 0,
        hasNext: false,
        itemCount: 0,
        pageCount: 0,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        fetchBooks.fulfilled,
        (state, action: PayloadAction<GetBooksResponse | null>) => {
          console.log('get book');
          if (state.bookList.length === 0) {
            state.bookList = action.payload?.data || [];
            state.pagination = action.payload?.pagination || {
              currentPage: 0,
              hasNext: false,
              itemCount: 0,
              pageCount: 0,
            };
          } else {
            if (action.payload?.data && action.payload?.pagination) {
              state.bookList = [...state.bookList, ...action.payload.data];
              state.pagination = action.payload.pagination;
            } else {
              console.log('error get book');
            }
          }
          state.isLoading = false;
        },
      )
      .addCase(fetchBooks.rejected, () => {
        console.log('error get book');
      });

    // fetch book
    builder.addCase(
      fetchBook.fulfilled,
      (state, action: PayloadAction<IBook | null>) => {
        state.currentBook = action.payload;
      },
    );
  },
});
export const { cleanBookList } = bookSlice.actions;
export default bookSlice.reducer;
