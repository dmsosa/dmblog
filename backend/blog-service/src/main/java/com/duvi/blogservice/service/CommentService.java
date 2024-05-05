package com.duvi.blogservice.service;

import com.duvi.blogservice.model.Comment;
import com.duvi.blogservice.model.dto.CommentDTO;
import com.duvi.blogservice.model.dto.SetCommentDTO;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import com.duvi.blogservice.model.exceptions.CommentNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {

    //Create DTO
    CommentDTO createDTO(Comment comment);
    //Basic CRUD
    CommentDTO createComment(String body, String username, String slug) throws UserNotFoundException, ArticleDoNotExistsException;
    List<CommentDTO> getComments();
    CommentDTO getCommentById(Long id) throws CommentNotFoundException;
    CommentDTO updateComment(Long commentId, SetCommentDTO newCommentDTO);
    void deleteComment(Long id) throws CommentNotFoundException;

    //Operations with Users

    List<CommentDTO> getCommentOfUser(String username) throws UserNotFoundException;
    List<CommentDTO> getCommentOfUser(Long userId) throws UserNotFoundException;

//    Operations with Articles
    List<CommentDTO> getCommentOfArticle(String slug) throws ArticleDoNotExistsException;
    List<CommentDTO> getCommentOfArticle(Long articleId) throws ArticleDoNotExistsException;

}
