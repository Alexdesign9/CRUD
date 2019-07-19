<?php

namespace App\Http\Controllers;
use App\Book;
use Illuminate\Http\Request;

class catalogController extends Controller {
	public function show(Book $book) {
		$test = $book->all();
		return response()->json($test);
	}

	public function create(Request $request, Book $book) {
		$year = date("Y");
		$validatedData = $request->validate([
			'name' => 'required',
			'author' => 'required',
			'category' => 'required',
			'year' => "required|integer|max:$year|not_in:0",
		]);

		$book->create($validatedData);
		$lastRow = $book->orderBy('id', 'desc')->first();
		return response()->json($lastRow->id);
	}

	public function destroy(Request $request, Book $book) {
		$id = $request->id;
		return response()->json($book->find($id)->delete());
	}

	public function edit(Request $request, Book $book) {
		$year = date("Y");
		$validatedData = $request->validate([
			'name' => 'required',
			'author' => 'required',
			'category' => 'required',
			'year' => "required|integer|max:$year|not_in:0",
		]);

		$id = $request->id;
		$name = $request->name;
		$author = $request->author;
		$category = $request->category;
		$year = $request->year;

		return response()->json($book->find($id)->update($validatedData));
	}
}
